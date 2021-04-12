import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ClientPackets } from '../networking/networkPackets/fromClient/clientPackets';
import { PacketPing } from '../networking/networkPackets/fromServer/ping';
import { ServerPackets } from '../networking/networkPackets/fromServer/serverPackets';

@Injectable({
  providedIn: 'root'
})
export class PingService {
  private measuredPing = 0;
  private pingPacketsQueue: number[] = [];

  private readonly updateFrequency = 500; // ms
  private lastUpdate: number = null;

  constructor(private socket: Socket) {
    this.socket.fromEvent<PacketPing>(ServerPackets.PONG)
      .subscribe(packet => {
        socket.emit(ClientPackets.PING2, packet.serverTimeStamp);

        if (this.pingPacketsQueue.indexOf(packet.clientTimestamp) >= 0) {
          this.measuredPing = (performance.now() - packet.clientTimestamp) * 0.5;
          while (this.pingPacketsQueue.shift() !== packet.clientTimestamp) {} // remove all previous queue entries as well as this one
        }
      });
  }

  public get Ping() {
    if (performance.now() - this.lastUpdate > this.updateFrequency) {
      this.RefreshPing();
    }

    return this.measuredPing;
  }

  private RefreshPing() {
    const currentTick = performance.now();
    this.pingPacketsQueue.push(currentTick);
    this.lastUpdate = currentTick;

    this.socket.emit(ClientPackets.PING, currentTick);
  }
}
