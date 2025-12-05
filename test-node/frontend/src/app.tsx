import { useState, useEffect } from "preact/hooks";
import type { JSX } from "preact";
import { Window } from "./components/Window";
import styled from "styled-components";

const Button = styled.button`
  color: #bf4f74;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #bf4f74;
  border-radius: 3px;
`;

export function App(): JSX.Element {
  const [firstname, setFirstname] = useState<string>("");
  const [newFirstname, setNewFirstname] = useState<string>("");

  const fetchFirstname = async () => {
    try {
      const response = await fetch("/api/hello-world");
      const data = await response.json();
      setFirstname(data.firstname);
    } catch (error) {
      console.error("Error fetching firstname:", error);
    }
  };

  const updateFirstname = async () => {
    try {
      await fetch("/api/hello-world", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstname: newFirstname }),
      });
      setNewFirstname("");
      fetchFirstname();
    } catch (error) {
      console.error("Error updating firstname:", error);
    }
  };

  useEffect(() => {
    fetchFirstname();
  }, []);

  return (
    <Window title="Hello World">
      <div>
        <Button>Normal Button</Button>
        <p>Current firstname: {firstname}</p>
        <input
          type="text"
          value={newFirstname}
          onInput={(e) => setNewFirstname((e.target as HTMLInputElement).value)}
          placeholder="Enter new firstname"
        />
        <button onClick={updateFirstname}>Update</button>
      </div>
    </Window>
  );
}
