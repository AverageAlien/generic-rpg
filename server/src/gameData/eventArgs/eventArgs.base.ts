export abstract class BaseEventArgs {
  public static eventName(): string {
    throw new Error('Event name not defined');
  }
}