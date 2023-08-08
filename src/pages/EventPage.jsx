import React from "react";
import {
  Heading,
  Card,
  Image,
  CardFooter,
  CardBody,
  CardHeader,
  Button,
} from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";
import { UserCard } from "../components/UI/UserCard";
import { CategoryCard } from "../components/UI/CategoryCard";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  return {
    event: await event.json(),
  };
};

export const EventPage = () => {
  const { event } = useLoaderData();

  const date = event.startTime.split("T")[0];
  const start = event.startTime.split("T")[1].slice(0, 5);
  const end = event.endTime.split("T")[1].slice(0, 5);

  return (
    <Card variant="filled" padding={1} size="md" maxW="md" align="center">
      <CardHeader>
        <Heading>{event.title}</Heading>
        <p>{date}</p>
      </CardHeader>

      <CardBody>
        <Image src={event.image} alt={event.title} boxSize="xs" />
        <p>{event.description}</p>
        <br />
        <p>Start time: {start}</p>
        <p>End time: {end}</p>
        <p>Location: {event.location}</p>
        <br />
        <CategoryCard event={event} />
        <UserCard userId={event.createdBy} />
      </CardBody>

      <CardFooter>
        <Button>Edit</Button>
        <Button>Delete</Button>
        <Link to="/">
          <Button>Home</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
