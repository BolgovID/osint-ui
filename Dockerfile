FROM node:22.13.1-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install -g @angular/cli@19
RUN npm ci
COPY . .
RUN ng build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/osint-front/browser /usr/share/nginx/html
EXPOSE 4200
ENTRYPOINT ["nginx", "-g"]
CMD ["daemon off;"]