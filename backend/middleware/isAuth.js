import jwt from "jsonwebtoken"

const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies          // ✅ fixed typo: toekn → token

    if (!token) {
      return res.status(401).json({ message: "User doesn't have a token" })  // ✅ added return
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET)  // ✅ fixed: toen → token

    if (!verifyToken) {
      return res.status(401).json({ message: "Invalid token" })    // ✅ added return
    }

    req.userId = verifyToken.id            // ✅ fixed: verifyToken.userId → verifyToken.id
                                           //    because genToken signs with { id: user._id }
    next()

  } catch (error) {
    return res.status(401).json({ message: `isAuth error: ${error.message}` })  // ✅ error.message
  }
}

export default isAuth