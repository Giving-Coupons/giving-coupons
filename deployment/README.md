# Giving Coupons Deployment

## Certificate Generation

The following steps should only be done once per server deployment.

1. Install CertBot:
   ```sh
   sudo apt-get install certbot
   ```
1. Generate a certificate by running the following command and entering the domain of the application:
   ```sh
   certbot certonly --standalone -m <EMAIL> --no-eff-email --agree-tos -d <DOMAIN>
   ```
   Note that certs must be generated for both the domain and the www subdomain.
1. Copy the contents of this [configuration file](https://github.com/certbot/certbot/blob/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf) into `/etc/letsencrypt/options-ssl-nginx.conf`.
1. Generate `/etc/letsencrypt/ssl-dhparam.pem`:
   ```sh
   openssl dhparam -out /etc/letsencrypt/ssl-dhparams.pem 4096
   ```

Certificate renewal will be automatically handled by the CertBot container.

## Running the Application

1. Install Docker and Docker Compose.
1. Clone this repository.
1. In the deployment folder, create the `.env` with the production values. See the [example](.env.template).
1. Run from project root:
   ```sh
   docker compose -f deployment/docker-compose.yml up -d
   ```

## Updating the Application

1. Login to the Github container registry (set the $CR_PAT environment variable to your [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)):
   ```sh
   export CR_PAT=YOUR_TOKEN
   ```
   ```sh
   echo $CR_PAT | docker login ghcr.io -u USERNAME --password-stdin
   ```
1. Run from project root:
   ```sh
   docker compose -f deployment/docker-compose.yml up -d
   ```

Note that images are built in the CI pipeline and pushed to Github container registry. The `docker-compose.yml` file pulls the latest images from Github container registry.
