export const teamSearch = (temp, searchWord, filterQueries, sortQueries) => {
        let searchList = temp;
        let searchedUsers;

        searchList.forEach((item, index) => {
            let users = temp[index].users;


            // ----- filter -----


            // filter項目があるか調べる
            // if(searchQueries[0].length !== 0) {
            //     searchQueries[0].forEach((searchItem, index) => {
            //         searchedUsers.filter(() => {
            //             searchItem["key"]
            //         })
            //     })
            // }


            // ----- sort ------

            // sort項目があるか調べる
            if(sortQueries.length !== 0) {
                sortQueries.forEach((searchItem, index) => {
                    searchedUsers = users.sort((a, b) => {
                        a = a[searchItem["key"]];
                        b = b[searchItem["key"]];

                        if(a < b) {
                            return -1;
                        }
    
                        if(a > b) {
                            return 1;
                        }
    
                        return 0;
                    })
                })
            } else {
                // defaultの表示順序
                searchedUsers = users.sort((a, b) => {
                    a = a["order"];
                    b = b["order"];

                    if(a < b) {
                        return -1;
                    }

                    if(a > b) {
                        return 1;
                    }

                    return 0;
                })
            }


            searchList[index] = {...searchList[index], users: searchedUsers}
        });

        return searchList;
}