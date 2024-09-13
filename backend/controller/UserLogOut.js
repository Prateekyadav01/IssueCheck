
// const userLogout=async(req,res)=>{
// try{
//     res.clearCookie("token")
//     res.json({
//         message:"Log out Successfully",
//         error:false,
//           success:true,
//           data:[]
//     })
// }catch(e){
//     console.log(e)
//     res.status(500).send({
//         success:false,
//         message:e.message})
// }
// }

// module.exports=userLogout

const userLogout = async (req, res) => {
    try {
      // Clear the token cookie
      res.clearCookie("token", { httpOnly: true, sameSite: 'Strict' });
  
      res.json({
        message: "Logged out successfully",
        error: false,
        success: true,
        data: []
      });
    } catch (e) {
      console.log(e);
      res.status(500).send({
        success: false,
        message: e.message
      });
    }
  }
  
  module.exports = userLogout;
  