// Import the Genkit core libraries and plugins.
import {genkit} from "genkit";
// Import models from the Google AI plugin. The Google AI API provides access to
// several generative models. Here, we import Gemini 1.5 Flash.
import {googleAI, gemini15Flash} from "@genkit-ai/googleai";

// From the Firebase plugin, import the functions needed to deploy flows using
// Cloud Functions.
import {firebaseAuth} from "@genkit-ai/firebase/auth";
import {onFlow} from "@genkit-ai/firebase/functions";
  plugins: [
    // Load the Google AI plugin. You can optionally specify your API key
    // by passing in a config object; if you don't, the Google AI plugin uses
    // the value from the GOOGLE_GENAI_API_KEY environment variable, which is
    // the recommended practice.
    googleAI(),
  ],
});

// Define a simple flow that prompts an LLM to generate menu suggestions.
export const menuSuggestionFlow = onFlow(
  ai,
  {
    name: "menuSuggestionFlow",
    inputSchema: z.string(),
    outputSchema: z.string(),
    authPolicy: firebaseAuth((user) => {
      // By default, the firebaseAuth policy requires that all requests have an
      // The `user` parameter represents the authenticated user making the request.
      // By default, the firebaseAuth policy requires that all requests have an
      // `Authorization: Bearer` header containing the user's Firebase
      // Authentication ID token. All other requests are rejected with error
      // 403. If your app client uses the Cloud Functions for Firebase callable
      // functions feature, the library automatically attaches this header to
      // requests.
      // You should also set additional policy requirements as appropriate for
      // your app. For example:
      // if (!user.email_verified) {
      //   throw new Error("Verified email required to run flow");
      // }
    }),
  },
  async (subject) => {
    const prompt = `Suggest an item for the menu of a ${subject} themed restaurant`;
    
    const prompt = `Suggest an item for the menu of a ${subject} themed restaurant`;
      prompt: prompt,
      config: {
        temperature: 1,
        // The temperature parameter controls the randomness of the generated text.
        // A higher value like 1 will make the output more random, while a lower value
        // like 0 will make it more deterministic.
                temperature: 1,
    });
    });

    // Handle the response from the model API. In this sample, we just
    // convert it to a string, but more complicated flows might coerce the
    // response into structured output or chain the response into another
    // LLM call, etc.
    return llmResponse.text;
  }
);
