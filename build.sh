#!/bin/bash
#dev=("http://zke-alpha.dev.ztosys.com/" "http://10.9.63.225:30880/")
#test=("http://10.9.56.153:30880/" "http://10.9.15.254:30880/" "http://zke-alpha.test.ztosys.com/" "http://zke.test.ztosys.com/")
#prod=("http://zke-zss.dev.ztosys.com/")
#all=("http://zke-alpha.dev.ztosys.com/" "http://10.9.63.225:30880/" "http://10.9.56.153:30880/" "http://10.9.15.254:30880/" "http://zke-alpha.test.ztosys.com/" "http://zke.test.ztosys.com/" "http://zke-zss.dev.ztosys.com/")

version=${1:-"0000"}
namespace=kubesphere-system
deployment=ks-console
container=registryztosyscomkubesphereks-console-3eidmd
source=registry.ztosys.com/kubesphere/ks-console
tag=oauth

image=$source:$tag-$version

echo "====== build.sh ======"
echo "====== sh $1 $2 ======"

cd /home/baseuser/console/
# echo "====== git checkout . ======"
git checkout .
# echo "====== git checkout $2 ======"
git checkout $2
echo "====== git pull ======"
git pull
# echo "====== rm -rf dist ======"
rm -rf dist/
# echo "====== npm install ======"
# npm install
echo "====== npm run build ======"
npm run build
echo "====== docker build -t iamge ======"
sudo docker build -t $image .
echo "====== docker push iamge ======"
sudo docker push $image

case $2 in
develop)
  echo "dev env"
  kubectl --kubeconfig ~/.kube/config-dev set image deployment/$deployment $container=$image
  ;;
test)
  echo "test env"
  ;;
prod)
  echo "prod env"
  ;;
*)
  echo "zto-test env"
  kubectl -n $namespace set image deployment/$deployment $container=$image
  ;;
esac

echo "====== done ======"
