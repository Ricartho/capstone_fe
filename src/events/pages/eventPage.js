import React from "react";

import EventList from "../components/eventList";

function EventPage({events}){
    return(<EventList events={events} />);
}
export default EventPage;