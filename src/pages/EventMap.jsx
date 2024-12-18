
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getUserLocation, getCityFromCoordinates, getCoordinatesFromCity } from './locationService';
import axios from 'axios';
import { eventsbytypeApi } from '../apiroutes';

// Icons for user and events
const userIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    iconSize: [35, 35]
});
const eventIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [30, 30]
});

function EventMap() {
    const [userLocation, setUserLocation] = useState(null);
    const [events, setEvents] = useState([]);
    const [allevents, setallevents] = useState([]);
    useEffect(() => {
        axios.get(`${eventsbytypeApi}/${'All'}/${'All'}`).then((res) => {
            setallevents(res.data.events);
        
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    // Retrieve user's location
    useEffect(() => {
        const fetchUserLocation = async () => {
            try {
                const { latitude, longitude } = await getUserLocation();
                setUserLocation([latitude, longitude]);

                // Optionally, get the user's city name from coordinates
                const city = await getCityFromCoordinates(latitude, longitude);
                console.log("User's city:", city);  // Use or display the city name as needed
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserLocation();
    }, []);

    // Fetch coordinates for each event's city name
    useEffect(() => {
        const fetchEventCoordinates = async () => {
            // const eventCities = [
            //     { id: 1, name: 'Event 1', city: 'MUMBAI' },
            //     { id: 2, name: 'Event 2', city: 'DELHI' },
            //     { id: 3, name: 'Event 3', city: 'CHENNAI' }
            // ];
            console.log(allevents)
            const geocodedEvents = await Promise.all(
                allevents.map(async (event) => {
                    try {
                        const { latitude, longitude } = await getCoordinatesFromCity(event.location.toUpperCase());
                        return { ...event, coordinates: [latitude, longitude] };
                    } catch (error) {
                        console.error(`Error geocoding ${event.location.toUpperCase()}:`, error);
                        return null;
                    }
                })
            );

            // Filter out any events that failed to geocode
            setEvents(geocodedEvents.filter(event => event !== null));
        };

        fetchEventCoordinates();
    }, [allevents]);

    return (
        <div style={{ height: "100vh", width: "100vw" }}>
            {userLocation && (
                <MapContainer center={userLocation} zoom={4} style={{ height: "100%", width: "100%" }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
                    />

                    {/* User Location Marker */}
                    <Marker position={userLocation} icon={userIcon}>
                        <Popup>
                            You are here
                        </Popup>
                    </Marker>

                    {/* Event Markers */}
                    {events.map(event => (
                        <Marker key={event._id} position={event.coordinates} icon={eventIcon}>
                            <Popup>
                                <strong>{event.title}</strong><br />
                                Location: {event.location}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            )}
        </div>
    );
}

export default EventMap;
