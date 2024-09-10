import dbConnect from "@/lib/dbConnection";
import outcomeModel from "@/models/outcome";

export async function POST(request) {
    
  await dbConnect();
  try {
   
    const { outcome_description,outcome_category,outcome_amount,outcome_type } = await request.json();
    const updatedOutcome = await outcomeModel.create(
        { outcome_description,outcome_category,outcome_amount,outcome_type },
      
    );
    if (!updatedOutcome) {
      return Response.json(
        {
          success: false,
          message: "Failed to updated",
        },
        {
          status: 404,
        }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Successfully updated",
        result: updatedOutcome,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to updated",
      },
      {
        status: 500,
      }
    );
  }
}


// export async function GET(request: Request) {
//   await dbConnect();
//   try {
//     const session = await getServerSession(authOptions);
//     const user: User = session?.user;
//     if (!session || !session.user) {
//       return Response.json(
//         {
//           success: false,
//           message: "Unauthorized",
//         },
//         {
//           status: 401,
//         }
//       );
//     }
//     const foundUser = await UserModel.findById({ _id: user._id });
//     if (!foundUser) {
//       return Response.json(
//         {
//           success: false,
//           message: "Failed to fetch",
//         },
//         {
//           status: 404,
//         }
//       );
//     }
//     return Response.json(
//       {
//         success: true,
//         message: "Success",
//         is_accepting_message: foundUser.is_accepting_message,
//         name:foundUser.name
//       },
//       {
//         status: 200,
//       }
//     );
//   } catch (error) {
//     return Response.json(
//       {
//         success: false,
//         message: "Failed to fetch",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }
