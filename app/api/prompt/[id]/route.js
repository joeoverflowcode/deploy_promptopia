import Prompt from '@models/prompt'
import { connectToDB } from "@utils/database"


// export const generateStaticParams = async () => {
//     try {
//       await connectToDB();
  
//       // Fetch all prompt IDs from the database
//       const prompts = await Prompt.find({}, '_id');
//       const paths = prompts.map(prompt => ({ params: { id: prompt._id.toString() } }));
  
//       return paths;
//     } catch (error) {
//       console.error("Error generating static paths:", error);
//       return [];
//     }
//   };

// GET (read)

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate("creator")
        if (!prompt) return new Response("Prompt Not Found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}
// PATCH (update)

export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json()
    
    try {
        await connectToDB()

        const existingPrompt = await Prompt.findById(params.id)

        if(!existingPrompt) {
            return new Response( "Prompt not found" , { status: 404 })
        }

        existingPrompt.prompt = prompt
        existingPrompt.tag = tag

        await existingPrompt.save()
        
        return new Response("Successfully updated the Prompts", { status: 200 })
    } catch (error) {
        return new Response( "Failed to update prompt" , { status: 500 })
    }
}
// DELETE (delete)
export const DELETE = async ( request, { params }) => {

    try {
        await connectToDB()

        await Prompt.findOneAndDelete(params.id)

        return new Response( "Prompt Deleted", { status: 200 })
    } catch (error) {
        return new Response( "Failed to delete prompt", { status: 500 })
    }
}