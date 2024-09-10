import dbConnect from "@/lib/dbConnection";
import outcomeCategoryModel from "@/models/outcome_category";

export async function POST(request) {
    
  await dbConnect();
  try {
   
    const { outcome_category } = await request.json();
    const updatedIncome = await outcomeCategoryModel.create(
      { outcome_category },
      
    );
    if (!updatedIncome) {
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
        result: updatedIncome,
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
export async function GET() {
    
    await dbConnect();
    try {
     
      const updatedIncome = await outcomeCategoryModel.find(
        { },
        
      );
      if (!updatedIncome) {
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
          result: updatedIncome,
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


// export async function GET(request) {
//   await dbConnect();
//   try {

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
