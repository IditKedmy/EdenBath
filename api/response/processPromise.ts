export async function processPromise(promise: Promise<Response>) {
  let response: Response | undefined;
  try {
    response = await promise;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return undefined;
    }
    console.dir(error);
    throw error;
  }
  if (!response) {
    throw new Error('Response is undefined');
  }
  return response;
}
