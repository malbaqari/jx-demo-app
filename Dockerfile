FROM node:20-alpine
WORKDIR /app
COPY server.js .
COPY gitex.css .
COPY page-before.html .
COPY page-after.html .
ENV PORT=8080
EXPOSE 8080
CMD ["node", "server.js"]
