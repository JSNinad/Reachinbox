
// import OpenAI from 'openai';
// import Groq from "groq-sdk";
// import { config } from './Configure';

// const openai = new OpenAI({
//   apiKey: config.openai.apiKey,
// });

// export const categorizeEmail = async (subject: string,content: string): Promise<string> => {
//   try {
//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo-0125",
//       messages: [
//         {role: "system", content: "You are an AI assistant that categorizes emails. Categorize the email as either 'Action Required', 'Information', or 'Follow-up Needed'. Respond with only the category."},
//         {role: "user", content: `Subject: ${subject}\n\nContent: ${content}`}
//       ],
//       max_tokens: 60,
//     });
//     const category = completion.choices[0].message.content?.trim() || 'Uncategorized';
//     console.log('Categorized as:', category);
//     return category;

// } catch (error) {
//   console.error('Error in categorizeEmail:', error);
//   return 'Uncategorized';
// } 
// };

// const groq = new Groq({ apiKey: process.env.OPENAI_API_KEY });

// export const getGroqChatCompletion = async (subject: string, content: string): Promise<string> => {
//   try {
//     const response = await groq.chat.completions.create({
//       messages: [
//         {
//           role: "system",
//           content: "You are an AI assistant that categorizes emails. Categorize the email as either 'Action Required', 'Information', or 'Follow-up Needed'. Respond with only the category.",
//         },
//         { role: "user", content: `Subject: ${subject}\n\nContent: ${content}` }
//       ],
//       model: "llama3-8b-8192",
//     });

//     // Assuming the response contains a field 'category' which holds the result
//     // Adjust this based on the actual structure of your response
//     const category = response.choices[0].message.content?.trim() || 'Uncategorized';
//     console.log('Categorized as:', category);
//     return category || 'Uncategorized';
//   } catch (error) {
//     console.error('Error fetching chat completion:', error);
//     return 'Uncategorized';
//   }
// };


// // Helper function to determine response based on category
// const getResponsePrompt = (category: string, content: string): string => {
//   switch (category) {
//     case 'Interested':
//       return `The email expresses interest. Craft a professional response that acknowledges their interest and proposes a follow-up action.`;
//     case 'Not Interested':
//       return `The email indicates disinterest. Draft a polite response that acknowledges their decision and leaves the door open for future opportunities.`;
//     case 'More information':
//       return `The email asks for more information. Create a response that provides the additional details they requested and suggests a time for a demo call or further discussion.`;
//     default:
//       return `Create a generic response for the email content.`;
//   }
// };

// export const generateResponse = async (category: string, subject: string, content: string): Promise<string> => {
//   try {
//     let customPrompt = '';

//     // Customize the response prompt based on the email category
//     switch (category) {
//       case 'Interested':
//         customPrompt = "The sender has shown interest. Kindly ask them if they are willing to hop on to a demo call by suggesting available time slots.";
//         break;
//       case 'Not Interested':
//         customPrompt = "The sender seems not interested. Politely acknowledge their response and thank them for their time.";
//         break;
//       case 'More information':
//         customPrompt = "The sender is asking for more information. Provide additional details and offer to schedule a demo if they are interested.";
//         break;
//       default:
//         customPrompt = "The email does not fit into a specific category. Respond politely and professionally based on the content.";
//         break;
//     }

//     const completion = await groq.chat.completions.create({
//       messages: [
//         { role: "system", content: "You are a helpful assistant responding to emails. Provide a concise, professional response that addresses the content of the email. Your response should be in the tone of a human assistant." },
//         { role: "user", content: `Category: ${category}\nSubject: ${subject}\n\nContent: ${content}\n\nResponse type: ${customPrompt}`}
//       ],
//       model: "llama3-8b-8192",
//     });

//     const response = completion.choices[0].message.content?.trim() || 'No response generated';
//     console.log('Generated response:', response);
//     return response;
//   } catch (error) {
//     console.error('Error in generateResponse:', error);
//     return 'No response generated';
//   }




import Groq from "groq-sdk";
import { config } from './Configure';

const groq = new Groq({ apiKey: process.env.OPENAI_API_KEY });

export const getGroqChatCompletion = async (subject: string, content: string): Promise<string> => {
  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an AI assistant that categorizes emails. Categorize the email as either 'Interested', 'Not Interested', or 'More information'. Respond with only the category.",
        },
        { role: "user", content: `Subject: ${subject}\n\nContent: ${content}` }
      ],
      model: "llama3-8b-8192",
    });

    const category = response.choices[0].message.content?.trim() || 'Uncategorized';
    console.log('Categorized as:', category);
    return category || 'Uncategorized';
  } catch (error) {
    console.error('Error fetching chat completion:', error);
    return 'Uncategorized';
  }
};


export const generateResponse = async (category: string, subject: string, content: string): Promise<string> => {
    try {
      let customPrompt = '';
  
      // Customize the response prompt based on the email category
      switch (category) {
        case 'Interested':
          customPrompt = "The sender has shown interest. Kindly ask them if they are willing to hop on to a demo call by suggesting available time slots.";
          break;
        case 'Not Interested':
          customPrompt = "The sender seems not interested. Politely acknowledge their response and thank them for their time.";
          break;
        case 'More information':
          customPrompt = "The sender is asking for more information. Provide additional details and offer to schedule a demo if they are interested.";
          break;
        default:
          customPrompt = "The email does not fit into a specific category. Respond politely and professionally based on the content.";
          break;
      }
  
      const completion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: "You are a helpful assistant responding to emails. Provide a concise, professional response that addresses the content of the email. Your response should be in the tone of a human assistant." },
          { role: "user", content: `Category: ${category}\nSubject: ${subject}\n\nContent: ${content}\n\nResponse type: ${customPrompt}` }
        ],
        model: "llama3-8b-8192",
      });
  
      const response = completion.choices[0].message.content?.trim() || 'No response generated';
      console.log('Generated response:', response);
      return response;
    } catch (error) {
      console.error('Error in generateResponse:', error);
      return 'No response generated';
    }
  };
