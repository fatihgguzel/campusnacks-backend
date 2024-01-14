import { customAlphabet } from 'nanoid';
import ShortCode from '../database/models/ShortCode';

const DEFAULT_LENGTH = 6;
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export default async function (length?: number) {
  let found = false;
  let value: string | null = null;
  while (!found) {
    const len = value ? value.length + 1 : length || DEFAULT_LENGTH;
    const nanoid = customAlphabet(alphabet, len);
    value = nanoid();

    const shortCode = await ShortCode.findOne({
      where: {
        value,
      },
    });

    if (!shortCode && value) {
      found = true;
    }
  }

  return value as string;
}
