FROM httpd:alpine

COPY ./src/ /usr/local/apache2/htdocs/

EXPOSE 80