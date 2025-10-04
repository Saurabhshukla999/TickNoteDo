import "@radix-ui/themes/styles.css";
import React from "react";
import "./index.css";
import { Button, Box, Flex, Grid, Section } from "@radix-ui/themes";
import { Link, Route, Routes } from "react-router-dom";
import Timer from "./pages/timer";
import Notes from "./pages/notes";
import Tasks from "./pages/Tasks";


function App() {
  return (
    <div class="flex flex-col items-center p-7 rounded-2xl">
      <Section>
        <h1>DashBoard</h1>
      </Section>
      <Section>
        <Grid>
          <Flex>
          <Link to="/Notes">Notes</Link> | 
          <Link to="/Tasks">Tasks</Link> |
          <Link to="/timer">Timer</Link>
        </Flex>

        <Routes>
          <Route path="/Notes" element={<Notes />} />
        <Route path="/Tasks" element={<Tasks />} />
        {/* fallback route */}
        <Route path="/timer" element={<Timer />} />
        </Routes>
        </Grid>
        
      </Section>
    </div>
  )
}

export default App
