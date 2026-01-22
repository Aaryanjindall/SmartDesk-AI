import { clerkClient } from "@clerk/express";

// export const auth = async(req , res , next) => {
//     try{
//         const {userId , has} = await req.auth();
//         const hasPremiumPlan = await has({plan: 'premium'});
//         const user = await clerkClient.users.getUser(userId);

//         if(!hasPremiumPlan && user.privateMetadata.free_usage){
//             req.free_usage = user.privateMetadata.free_usage
//         }else{
//             await clerkClient.users.updateUserMetadata(userId,{
//                 privateMetadata:{
//                     free_usage: 0
//                 }
//             })
//             req.free_usage = 0;

//         }
//         req.plan = hasPremiumPlan ?'premium' : 'free'
        
//     }
//       catch (error){
//         res.json({ success: false, message: error.message })

//     }
// }






export const auth = async (req, res, next) => {
  try {
    const authData = req.auth; // ✅ FIX HERE

    if (!authData || !authData.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const { userId, has } = authData;
    const hasPremiumPlan = await has({ plan: "premium" });
    const user = await clerkClient.users.getUser(userId);
     const free_usage =
      user.privateMetadata?.free_usage ?? 0;

    req.userId = userId;
    req.plan = hasPremiumPlan ? "premium" : "free";
    req.free_usage = free_usage;

    console.log("PLAN:", req.plan);

    next();
  } catch (error) {
    return res.json({
      success: false,
      message: error.message
    });
  }
};

