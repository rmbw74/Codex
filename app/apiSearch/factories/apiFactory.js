angular
.module("codex")
.factory("apiFactory", function ($http, TMDB_KEY) {
    return Object.create(null, {
        "cache": {
            value: null,
            writable: true
        },
        "TMDB_list": {
            value: function (searchString) {
                return $http({
                    method: "GET",
                    url: `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&language=en-US&query=${searchString}&page=1&include_adult=false`
                }).then(response => {
                    const data = response.data
                    this.cache = Object.keys(data).map(key => {
                        data[key].id = key
                        return data[key]
                    })

                    return this.cache
                })
            }
        }
    })
})
