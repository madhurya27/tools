PORT ?= 8080

serve:
	python3 -m http.server $(PORT) & sleep 0.5 && open http://localhost:$(PORT); wait

test:
	pnpm test
