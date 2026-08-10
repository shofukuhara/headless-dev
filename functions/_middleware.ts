interface Env {
  PREVIEW_USERNAME: string;
  PREVIEW_PASSWORD: string;
}

interface Context {
  request: Request;
  env: Env;
  next: () => Promise<Response>;
}

export const onRequest = async (context: Context): Promise<Response> => {
  const authorization = context.request.headers.get("Authorization");

  if (!authorization?.startsWith("Basic ")) {
    return new Response("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Preview"',
      },
    });
  }

  const encoded = authorization.slice(6);
  const decoded = atob(encoded);
  const [username, password] = decoded.split(":");

  if (
    username !== context.env.PREVIEW_USERNAME ||
    password !== context.env.PREVIEW_PASSWORD
  ) {
    return new Response("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Preview"',
      },
    });
  }

  return context.next();
};
