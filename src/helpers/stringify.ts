export default function (value: object) {
  try {
    return JSON.stringify(value);
  } catch (err) {
    console.error(err);
    return null;
  }
}
