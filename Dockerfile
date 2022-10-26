# ==== CONFIGURE =====

FROM node:16-alpine 
WORKDIR /app
COPY . .
# ==== BUILD =====
RUN npm ci 
RUN npm run build
# ==== RUN =======
ENV NODE_ENV production
EXPOSE 3000
#CMD [ "npx", "start", "build" ]

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]