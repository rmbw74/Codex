angular
    .module("codex")
    .controller("reportDataCtrl", function ($scope, databaseFactory, AuthFactory) {
        let currentUser = AuthFactory.getUser()
        $scope.userId = currentUser.uid
        $scope.userMovies = []
        $scope.TotalMovies = 0
        $scope.TotalDVD = 0
        $scope.TotalBluRay = 0
        $scope.TotalDigital = 0
        $scope.Total4K = 0
        let userMoviesFromResponse = []
        let data = []
        const chart = document.getElementById("PieChart")

        //this function will calculate all data to be diplayed by the chart
        chartData = function (totalMovies, DVD, BluRay, Digital, FourK) {
            let dataArray = []
            let percentDVD = Math.floor((DVD/totalMovies)*100)
            let percentBluRay = Math.floor((BluRay/totalMovies)*100)+1
            let percentDigital = Math.floor((Digital/totalMovies)*100)
            let percent4k = Math.floor((FourK/totalMovies)*100)
                dataArray.push(percentDVD, percentBluRay, percentDigital, percent4k)
            //console.log(dataArray)
            return dataArray
        }
        //grab all the movies for the user and count how many of each format they have.
        let userMovies = databaseFactory.all("movies").then(response => {
            userMoviesFromResponse = response.filter(movie => {
                return movie.uuid === currentUser.uid
            })
            $scope.userMovies = userMoviesFromResponse
            userMoviesFromResponse.forEach(movie => {
                let currentArray = movie.format
                if (currentArray.indexOf("DVD") > -1) {
                    $scope.TotalDVD += 1
                    $scope.TotalMovies += 1
                }
                if (currentArray.indexOf("Blu-Ray") > -1) {
                    $scope.TotalBluRay += 1
                    $scope.TotalMovies += 1
                }
                if (currentArray.indexOf("Digital") > -1) {
                    $scope.TotalDigital += 1
                    $scope.TotalMovies += 1
                }
                if (currentArray.indexOf("4kUltraHD") > -1) {
                    $scope.Total4K += 1
                    $scope.TotalMovies += 1
                }
            })
            //pass all the totals for movies to the chart data function and return it as data
            data = chartData($scope.TotalMovies, $scope.TotalDVD, $scope.TotalBluRay, $scope.TotalDigital, $scope.Total4K)

            //call the addData function and pass it the data from chartData
            addData(myDoughnutChart, data)
        })
        //this function adds data to the chart
        function addData(chart, data) {
            //grab the dataset in the configuration object for the chart
            chart.data.datasets.forEach((dataset) => {
                //iterate over each number and push it into the data array
                data.forEach(number => {
                    dataset.data.push(number);
                })
            })
            //update the chart on the web page
            chart.update();
        }



        //this is the definition of the doughnut chart on the report partial
        let myDoughnutChart = new Chart(chart, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [],
                    backgroundColor: [
                        "#daa520", "#0000ff", "#00cc00", "#cc00ff"
                    ],
                }],
                text: "Test",
                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: [
                    'DVD',
                    'BluRay',
                    'Digital',
                    '4k'
                ]
            },
            options: {
                responsive: true,
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Collection Breakdown By Format'
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                tooltips: {
                    callbacks: {
                        afterLabel: function(tooltipItem, data){
                            return tooltipItem.yLabel + "%"
                        }
                    }
                }
            }
        })

    })