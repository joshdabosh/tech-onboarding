import React, { useEffect, useState } from "react";
import { apiUrl, Service } from "@hex-labs/core";
import { SimpleGrid, Text, Button, Box } from "@chakra-ui/react";
import axios from "axios";
import UserCard from "./UserCard";

const UserData: React.FC = () => {

  // The useState hook is used to store state in a functional component. The
  // first argument is the initial value of the state, and the second argument
  // is a function that can be used to update the state. The useState hook
  // returns an array with the first element being the state and the second
  // element being the function to update the state.

  const [users, setUsers] = useState<any[]>([]);
  const [filterByPhone, setFilterByPhone] = useState<boolean>(false);

  // The useEffect hook basicaly runs the code inside of it when the component
  // mounts. This is useful for making API calls and other things that should
  // only happen once when the component is loaded.

  useEffect(() => {

    // This is an example of an async function. The async keyword tells the
    // function to wait for the axios request to finish before continuing. This
    // is useful because we can't use the data from the request until it is
    // finished.

    const getUsers = async () => {

      // TODO: Use the apiUrl() function to make a request to the /users endpoint of our USERS service. The first argument is the URL
      // of the request, which is created for the hexlabs api through our custom function apiUrl(), which builds the request URL based on
      // the Service enum and the following specific endpoint URL.

      // TODO: Also explore some of the other ways to configure the api call such as filtering and pagination.
      // Try to filter all the users with phone numbers starting with 470 or increase the amount of users returned from the default 50 (don't go above 100).

      // Postman will be your best friend here, because it's better to test out the API calls in Postman before implementing them here.

      // this is the endpoint you want to hit, but don't just hit it directly using axios, use the apiUrl() function to make the request
      const url = apiUrl(Service.USERS, "/users/hexlabs")

      // there is no way to send filters to the backend route,
      // so we have to filter client-side
      const {data: data} = await axios.get(url)

      // uncomment the line below to test if you have successfully made the API call and retrieved the data. The below line takes
      // the raw request response and extracts the actual data that we need from it.
      if (filterByPhone) {
        setUsers(data?.filter((profile: any) => profile.phoneNumber?.startsWith("470")))
      } else {
        setUsers(data)
      }
    };
    document.title = "Hexlabs Users"
    getUsers();
  }, [filterByPhone]);

  // ^^ The empty array at the end of the useEffect hook tells React that the
  // hook should only run once when the component is mounted. If you want it to
  // run every time a variable changes, you can put that variable in the array
  // and it will run every time that variable changes.


  // TODO: Create a function that sorts the users array based on the first name of the users. Then, create a button that
  // calls this function and sorts the users alphabetically by first name. You can use the built in sort() function to do this.

  const sortUsers = () => {
    setUsers(currUsers => {
      const ret = [...currUsers]

      ret.sort((a, b) => {
          if (a.name.first > b.name.first) {
            return 1;
          } else if (a.name.first < b.name.first) {
            return -1;
          }
          
          return 0;
        }
      )

      return ret
      }
    )
  }

  return (
    <Box style={{
      width: "90%",
      margin: "auto",
      paddingTop: "2em"
    }}>
      <Text fontSize="4xl">Hexlabs Users</Text>
      <Text fontSize="2xl">This is an example of a page that makes an API call to the Hexlabs API to get a list of users.</Text>

      <Button onClick={sortUsers}>Sort users by first name</Button>

      <Button
        margin={2}
        onClick={() => setFilterByPhone((prev: boolean) => !prev)}
        colorScheme={filterByPhone ? "green" : "gray"}
      >
        Only include phone numbers starting with 470
      </Button>

      <SimpleGrid columns={[2, 3, 5]} spacing={6} paddingX={0} paddingY={10}>

        {/* Here we are mapping every entry in our users array to a unique UserCard component, each with the unique respective
        data of each unique user in our array. This is a really important concept that we use a lot so be sure to familiarize
        yourself with the syntax - compartmentalizing code makes your work so much more readable. */}
        { users.map((user) => (
          <UserCard user={user} key={user.id}/>
        ))}

      </SimpleGrid>
    </Box>
  );
};

export default UserData;