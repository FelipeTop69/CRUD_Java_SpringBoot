CREATE TABLE category (
    ca_id SERIAL PRIMARY KEY,
    ca_name VARCHAR(30) NOT NULL,
    ca_description TEXT
);

CREATE TABLE organizer (
    org_id SERIAL PRIMARY KEY,
    org_name VARCHAR(30) NOT NULL,
    org_phone VARCHAR(10) NOT NULL
);

CREATE TABLE location (
    loc_id SERIAL PRIMARY KEY,
    loc_name VARCHAR(30) NOT NULL,
    loc_address VARCHAR(50) NOT NULL,
    loc_capacity INT NOT NULL
);

CREATE TABLE typeTicket (
    tyt_id SERIAL PRIMARY KEY,
    tyt_name VARCHAR(30) NOT NULL,
    tyt_description TEXT
);

CREATE TABLE sponsor (
    sp_id SERIAL PRIMARY KEY,
    sp_name VARCHAR(30) NOT NULL,
    sp_phone VARCHAR(10) NOT NULL
);

CREATE TABLE participant (
    pa_id SERIAL PRIMARY KEY,
    pa_name VARCHAR(30) NOT NULL,
    pa_phone VARCHAR(10) NOT NULL
);

CREATE TABLE event (
    ev_id SERIAL PRIMARY KEY,
    ev_name VARCHAR(30) NOT NULL,
    ev_description TEXT,
    ev_date TIMESTAMP NOT NULL,
    org_id INT NOT NULL,
    loc_id INT NOT NULL,
    cat_id INT NOT NULL,
    CONSTRAINT fk_event_organizer FOREIGN KEY (org_id) REFERENCES organizer(org_id) ON DELETE CASCADE,
    CONSTRAINT fk_event_location FOREIGN KEY (loc_id) REFERENCES location(loc_id) ON DELETE CASCADE,
    CONSTRAINT fk_event_category FOREIGN KEY (cat_id) REFERENCES category(ca_id) ON DELETE CASCADE
);

CREATE TABLE ticket (
    tick_id SERIAL PRIMARY KEY,
    tick_price DECIMAL NOT NULL,
    tick_availableQuantity INT NOT NULL,
    id_event INT NOT NULL,
    tyt_id INT NOT NULL,
    CONSTRAINT fk_ticket_event FOREIGN KEY (id_event) REFERENCES event(ev_id) ON DELETE CASCADE,
    CONSTRAINT fk_ticket_type FOREIGN KEY (tyt_id) REFERENCES typeTicket(tyt_id) ON DELETE CASCADE
);

CREATE TABLE event_sponsor (
    ev_sp_id SERIAL PRIMARY KEY,
    ev_id INT NOT NULL,
    sp_id INT NOT NULL,
    CONSTRAINT fk_ev_sp_event FOREIGN KEY (ev_id) REFERENCES event(ev_id) ON DELETE CASCADE,
    CONSTRAINT fk_ev_sp_sponsor FOREIGN KEY (sp_id) REFERENCES sponsor(sp_id) ON DELETE CASCADE
);

CREATE TABLE participant_event (
    pa_ev_id SERIAL PRIMARY KEY,
    ev_id INT NOT NULL,
    pa_id INT NOT NULL,
    CONSTRAINT fk_pa_ev_event FOREIGN KEY (ev_id) REFERENCES event(ev_id) ON DELETE CASCADE,
    CONSTRAINT fk_pa_ev_participant FOREIGN KEY (pa_id) REFERENCES participant(pa_id) ON DELETE CASCADE
);
