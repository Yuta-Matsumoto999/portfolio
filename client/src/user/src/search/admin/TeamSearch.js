export const teamSearch = (temp, searchWord, filterQuery, sortQuery) => {
        let searchList = temp;

        searchList.forEach((item, index) => {
            let users = temp[index].users;

            // defaultの表示順序
            const searchedUsers = users.sort((a, b) => {
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

            searchList[index] = {...searchList[index], users: searchedUsers}
        });

        return searchList;
}