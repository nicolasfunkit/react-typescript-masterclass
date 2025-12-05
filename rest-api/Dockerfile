ARG DENO_VERSION=latest

FROM denoland/deno:${DENO_VERSION}

WORKDIR /app

COPY deps.ts .

RUN deno cache --unstable deps.ts

COPY . .

RUN deno cache --unstable main.ts

RUN deno compile --unstable -A --output deno_rest --target x86_64-unknown-linux-gnu main.ts

CMD ["deno_rest"]
