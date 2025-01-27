.PHONY: start-client start-server start

dev-client:
	cd client && npm run dev

dev-server:
	cd server && node --watch main

dev:
	$(MAKE) dev-client &
	$(MAKE) dev-server