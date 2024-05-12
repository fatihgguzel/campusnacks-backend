import jwt from 'jsonwebtoken';

export default function (payload: { id: number; jwtSecureCode: string; isUser: boolean }) {
  return jwt.sign(
    {
      ...payload,
    },
    process.env.JWT_SECRET || 'secret-test',
    {
      expiresIn: '6h',
    },
  );
}
