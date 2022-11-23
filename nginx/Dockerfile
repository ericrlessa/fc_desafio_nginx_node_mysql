FROM nginx:1.23.2-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY reverse_proxy_node_test.conf /etc/nginx/conf.d/reverse_proxy_node_test.conf