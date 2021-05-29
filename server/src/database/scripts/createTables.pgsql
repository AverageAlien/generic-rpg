CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 ),
    username varchar(32) NOT NULL,
    password char(128) NOT NULL,
    isAdmin boolean,
    isBanned boolean,
    email varchar(64),
    PRIMARY KEY (id)
);
ALTER TABLE public.users
    OWNER to my_user;
	
CREATE TABLE IF NOT EXISTS public.locations
(
	name varchar(32) NOT NULL,
	levelData text NOT NULL,
	PRIMARY KEY (name)
);
ALTER TABLE public.locations
	OWNER TO my_user;
	
CREATE TABLE IF NOT EXISTS public.userdata
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 ),
    userId integer NOT NULL,
    location varchar(32) NOT NULL,
    playerData text NOT NULL,
	
    PRIMARY KEY (id),
    CONSTRAINT UserData_User FOREIGN KEY (userId)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT UserData_Location FOREIGN KEY (Location)
        REFERENCES public.locations (name) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);
ALTER TABLE public.userdata
    OWNER to my_user;
	
DROP TABLE userData;
DROP TABLE locations;
DROP TABLE users;