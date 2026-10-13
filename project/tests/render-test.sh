#!/usr/bin/env bash
# Renders each example DevBox through the composition and asserts the container size.
# Needs Docker (run with sudo if your user can't reach the socket): sudo env PATH=$PATH HOME=/root tests/render-test.sh
set -euo pipefail
cd "$(dirname "$0")/.."
fail=0
check() { # size cores memory disk
  out=$(crossplane composition render "examples/devbox/$1.yaml" apis/devbox/composition.yaml --xrd apis/devbox/definition.yaml 2>&1)
  for want in "cores: $2" "dedicated: $3" "      size: $4" "hostname: example-$1"; do
    if ! grep -qF -- "$want" <<<"$out"; then echo "FAIL $1: missing '$want'"; fail=1; fi
  done
  echo "ok   $1"
}
check small  1 256  2
check medium 2 1024 8
check large  4 2048 16
exit $fail
