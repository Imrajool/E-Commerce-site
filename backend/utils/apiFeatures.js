class APIFeatures {
    constructor(query, queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }

    search(){
        let keyword=this.queryStr.keyword ? {
            name:{
                $regex: this.queryStr.keyword,
                $options:'i'
            }
        }: {};

        this.query=this.query.find({...keyword})
        return this;
    }

    filter() {
        const queryObj = { ...this.queryStr };
        const excludedFields = ['keyword', 'page', 'limit', 'sort'];
        excludedFields.forEach(el => delete queryObj[el]);
      
        // New object to hold transformed filters
        const filters = {};
      
        // Iterate over each key in queryObj
        for (const key in queryObj) {
          if (key.includes('[') && key.includes(']')) {
            // Extract field name and operator
            const field = key.substring(0, key.indexOf('['));
            const operator = key.substring(key.indexOf('[') + 1, key.indexOf(']'));
            
            // Initialize object for field if doesn't exist
            if (!filters[field]) filters[field] = {};
            
            // Assign MongoDB operator with $ prefix and convert value to number if possible
            const value = isNaN(queryObj[key]) ? queryObj[key] : Number(queryObj[key]);
            filters[field][`$${operator}`] = value;
      
          } else {
            // Normal key-value, convert value to number if possible
            const value = isNaN(queryObj[key]) ? queryObj[key] : Number(queryObj[key]);
            filters[key] = value;
          }
        }
      
        this.query = this.query.find(filters);
        return this;
    }




}

module.exports=APIFeatures;