import bcrypt from "bcryptjs";

export async function hashedPassword(password) {
    const rounds = 10
    return bcrypt.hash(password, rounds)
}