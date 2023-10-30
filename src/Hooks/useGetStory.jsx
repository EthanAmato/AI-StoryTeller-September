import { useState } from "react";

// 1. Set up a connection with OpenAI
// 2. It will create 3 states: Data, isLoading, and Errors for handling
// all info related to an API call
// 3. It will create a function (callback) that is returned from this
// hook alongside our three states that takes in a prompt, calls
// openAI for a story, and sets our 3 states accordingly

export default function useGetStory() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create a callback that has state-management built in
  // that will call OpenAI's api

  const fetchStory = async (prompt) => {
    // The first thing we should do when calling the api,
    // is set the 'loading' state to true:
    console.log(prompt)
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
          method: "POST",
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  "You are a skilled storyteller, adept at weaving tales based on user input",
              },
              {
                role: "user",
                content: prompt,
              },
            ],
          }),
        }
      );
      console.log(response)
      const data = await response.json();
      console.log(data.choices[0].message.content)
      setData(data.choices[0].message.content);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  return {data, isLoading, error, fetchStory};


}
