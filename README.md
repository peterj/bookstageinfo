# Bookstageinfo

This is repo used to showcase Backstage withe the Bookinfo application (hence book-stage-info).

The source for the bookinfo service is from the [Istio repo](https://github.com/istio/istio/).


## Backstage setup


1. Install the Backstage aspp

2. Run the postgres database (locally):

```shell
docker run --name some-postgres -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d postgres
```


3. Register existing component by pointing to the catalog-info.yaml file in the root of this repo.

```
https://github.com/peterj/bookstageinfo/blob/main/catalog-info.yaml
```