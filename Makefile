DOCKER_IMG = klakegg/hugo:0.79.1-ext
SERVER = server --buildDrafts --buildFuture -- disableFastRender --ignoreCache

setup:
	yarn

serve: 
	hugo $(SERVER) 

docker-build:
	docker build -f dev.Dockerfile -t docsy-example-dev:latest .

docker-serve:
	docker run --publish 1313:1313 --mount src=$(PWD),target=/home/docsy/app,type=bind docsy-example-dev:latest

production-build:
	hugo \
		--minify

non-production-build:
	hugo --enableGitInfo

preview-build:
	hugo \
		--baseURL $(DEPLOY_PRIME_URL) \
		--buildDrafts \
		--buildFuture \
		--minify

