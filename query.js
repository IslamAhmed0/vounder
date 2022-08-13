
router
  .post('/getBranchesByAreas',  (request: Request, response: Response, next: NextFunction) => {
    async function main() {
      const d = new Date();
      let day = d.getDay();
      let time = d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
      console.log(time)

      console.log(dayOfWeekAsInteger()[day])
      var name = request.headers["lang"];
      var description = "description";
      if (name == "ar"){
        name = "name";
        description = "description";
      }
      else {
        name = "name_en";
        description = "description_en";

      }
      const numDeleted = await RestaurantModel.query()
        .select(['restaurants.'+name+' as name','restaurants.logo','restaurants.cover',
          'restaurants.id as RestauranthId',
          'menu_categories.id as MenuCategoriesId',"branches:areas_join.delivery_time","branches:areas_join.area_id","branches.user_id","branches:areas_join.delivery_cost"
        ])
        .select(raw('CASE WHEN ?? is not null THEN "true" ELSE "false" END AS IsOpen',"WT:worktimes.id"))
        .select(raw('CASE WHEN ?? is not null THEN ?? ELSE "false" END AS offerDescription'
          ,'menu_categories:menu_categories_items:offers.'+description,
          'menu_categories:menu_categories_items:offers.'+description))

        .withGraphFetched('[cuisines(filterCuisines)]')
        .joinRelated('[branches.areas]')
        .leftJoinRelated('[menu_categories.menu_categories_items.offers,rates]')
        .leftJoinRelated('branches as WT.worktimes(filterTimes)')
        .modifiers({
          filterCuisines: query => query.select([''+name+' as name','cuisines.id'])
          ,

          filterTimes: query => query.where({'day_en': dayOfWeekAsInteger()[day]})
            .andWhere('open_time','<',time)
            .andWhere('close_time','>',time)
            .andWhere('isActive','=',1)

          ,
        })
        .where({'area_id':request.body.area_id,"category_id":request.body.CatId})
        .orWhere({'branches:areas.google_id':request.body.google_id,"category_id":request.body.CatId})
        .andWhere({'branches.activated':1})

        .avg('rates.rate as rate')
        .groupBy('restaurants.id')
      ;
      response.status(200).json(numDeleted);
    }
    main().catch((e) => {
      response.json(e.message)

      throw e
    })

  })








router
  .get('/getCusinesList/:CatId',(req:any,respo:any)=> {
    async function main() {
      var name = req.headers["lang"];
      var description = "description";
      if (name == "ar"){
        name = "name";
        description = "description";
      }
      else {
        name = "name_en";
        description = "description_en";

      }
      if (req.params.CatId != 0) {
        const allUsers = await CuisinesModel.query().where("category_id",req.params.CatId).select('*',''+name+' as name')
        respo.json(allUsers)

      }else {
        const allUsers = await CuisinesModel.query().select('*',''+name+' as name').withGraphFetched('categories')
        respo.json(allUsers)

      }

    }
    main().catch((e) => {
      respo.json(e.message)

      throw e
    })

  })


























router
  .get('/getTownsArea/:TownsId',(req, respo)=> {
    async function main() {
      var name = req.headers["lang"];
      if (name == "ar"){
        name = "name";
      }
      else {
        name = "name_en";

      }
      const allUsers = await AreasModel.query().where('town_id',parseInt(req.params.TownsId)).select('id','town_id',''+name+' as name')
      respo.json(allUsers)


    }
    main().catch((e) => {
      respo.json(e.message)

      throw e
    })
      .finally(async () => {
      })
  })

router
  .get('/index',(req, respo)=>{
    async function main() {

      const allUsers = await Categories.query()
      respo.json(allUsers)
    }
    main().catch((e) => {
      respo.json(e.message)

      throw e
    })

  })


router
  .post('/GetMainSliders',(req: any, respo: any)=> {
    async function main() {
      const d = new Date();

      const address = await AdsSpacesNameModel.query()
        .withGraphFetched('[AdsSpacesprice(selectPriceFields)]')
        .modifiers({
          selectPriceFields: query => query.select(['ads_space_prices.id','ads_space_prices.positions'])

            .andWhere('sliders.approval',1)
            .andWhere('sliders.publish',1)

            // .andWhere('sliders.start_date','<',d)
            // .andWhere('sliders.end_date','>',d)
            .where({'sliders:restaurants:branches:areas.google_id':req.body.googleId})
            .withGraphFetched('sliders')
            .innerJoinRelated('sliders.restaurants.branches.areas')
            .orderBy('ads_space_prices.positions')
            .groupBy('ads_space_prices.id')
          ,

        })

      ;
      respo.json(address)


    }
    main().catch((e) => {
      respo.json(e.message)

      throw e
    })
  })


home page links















router
  .post('/GetHomePage',LangHeader, (req: any, respo: any)=> {
    async function main() {


      const GetHomePageTitles = await HomeMobileTitlesModel.query().select('home_mobile_titles.'+req.title+' as title')

      const GetPercentageForVendors = {"title":GetHomePageTitles[0].title,"data": await getVendorOffersData(req.name,6,req.description,req.body.googleId)}
      const GetNewOffers = {"title":GetHomePageTitles[1].title,"data": await GetNewOffer(req.name,req.description,req.body.googleId,6)}
      const getMostOrderedBranchs =  {"title":GetHomePageTitles[2].title,"data":await  getMostOrderedBranch(req.name,req.description,req.body.googleId,6)}
      const MostSellItems =  {"title":GetHomePageTitles[3].title,"data":await  MostSellItem(req.body.googleId,6)}
      const GetNearestBranche =  {"title":GetHomePageTitles[4].title,"data":await GetNearestBranches(req.name,req.description,req.body.googleId,6)}
      const GetFreeDliveryBranche =  {"title":GetHomePageTitles[5].title,"data": await  GetFreeDliveryBranches(req.name,req.description,req.body.googleId,6)}






      respo.json({"GetPercentageForVendors":GetPercentageForVendors ,"lastoffers":GetNewOffers,"getMostOrderedBranch":getMostOrderedBranchs,"MostSellItems":MostSellItems,"GetNearestBranche":GetNearestBranche,"GetFreeDliveryBranches":GetFreeDliveryBranche})

    }
    main().catch((e) => {
      respo.json(e.message)

      throw e
    })
  })

router
  .post('/getVendorOffersData',LangHeader, (req: any, respo: any)=> {

    async function main() {
      const getVendorOffers = await getVendorOffersData(req.name,100,req.description,req.body.googleId)
      respo.json(getVendorOffers)

    }
    main().catch((e) => {
      respo.json(e.message)
      throw e
    })
  })

router
  .post('/GetNewOffer',LangHeader, (req: any, respo: any)=> {

    async function main() {
      const GetNewOfferData = await GetNewOffer(req.name,req.description,req.body.googleId,100)
      respo.json(GetNewOfferData)

    }
    main().catch((e) => {
      respo.json(e.message)
      throw e
    })
  })

router
  .post('/getMostOrderedBranchs',LangHeader, (req: any, respo: any)=> {

    async function main() {
      const getMostOrderedBranchs = await getMostOrderedBranch(req.name,req.description,req.body.googleId,100)
      respo.json(getMostOrderedBranchs)

    }
    main().catch((e) => {
      respo.json(e.message)
      throw e
    })
  })

router
  .post('/MostSellItems',LangHeader, (req: any, respo: any)=> {

    async function main() {
      const MostSellItems = await MostSellItem(req.body.googleId,100)
      respo.json(MostSellItems)

    }

    main().catch((e) => {


      respo.json(e.message)
      throw e
    })
  })


router
  .post('/GetNearestBranches',LangHeader, (req: any, respo: any)=> {

    async function main() {
      const getMostOrderedBranchs = await GetNearestBranches(req.name,req.description,req.body.googleId,100)
      respo.json(getMostOrderedBranchs)

    }
    main().catch((e) => {
      respo.json(e.message)
      throw e
    })
  })


router
  .post('/GetFreeDliveryBranches',LangHeader, (req: any, respo: any)=> {

    async function main() {
      const GetFreeDliveryBranche = await GetFreeDliveryBranches(req.name,req.description,req.body.googleId,100)
      respo.json(GetFreeDliveryBranche)

    }
    main().catch((e) => {
      respo.json(e.message)
      throw e
    })
  })
return router
}

async function getVendorOffersData(name:string,limit:number,description:string,google_id:string) {
  const d = new Date();
  let day = d.getDay();
  let time = d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
  console.log(time)

  const GetPercentageForVendors = await WalletModel.query()

    .joinRelated('[restaurants.branches.areas]')
    .leftJoinRelated('[transaction]')
    .select('wallets.id')

    .limit(limit)
    .where({'restaurants:branches:areas.google_id':google_id})
    .limit(limit)

    .withGraphFetched('[restaurants(selectRestuarant).cuisines(filterCuisines)]')
    .modifiers({
      selectRestuarant: query => query.select(['restaurants.'+name+' as name','restaurants.logo','restaurants.cover',
        'restaurants.id as RestauranthId',
        "branches:areas_join.delivery_time","branches:areas_join.delivery_cost"
      ])
        .joinRelated('[branches.areas]')
        .avg('rates.rate as rate')
        .groupBy('restaurants.id')
        .leftJoinRelated('[branches as WT.worktimes(filterTimes),rates]')

        .select(raw('CASE WHEN  ?? is not null THEN "true" ELSE "false" END AS IsOpen',"WT:worktimes.id"))
      ,
      filterTimes: query => query.where({'day_en': dayOfWeekAsInteger()[day]})
        .andWhere('open_time','<',time)
        .andWhere('close_time','>',time)
        .andWhere('isActive','=',1)
      ,
      filterCuisines: query => query.select([''+name+' as name','cuisines.id'])
    });

  return GetPercentageForVendors;
}
function dayOfWeekAsInteger() {
  return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
}
async function GetNewOffer(name:string,description:string,google_id:string,limit:number){
  const date = new Date();
  let day = date.getDay();
  let time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
  const lastoffers = await RestaurantModel.query().select([
    'restaurants.'+name+' as name',
    'restaurants.id as RestauranthId','offers.'+description+' as description','offers.img as cover',"branches:areas_join.delivery_time","branches:areas_join.delivery_cost"])

    .withGraphFetched('[cuisines(filterCuisines)]')
    .joinRelated('[branches.areas]')
    .avg('rates.rate as rate')
    .where({'branches:areas.google_id':google_id,})
    .limit(limit)

    .joinRelated('[branches.areas,offers(filterTimes)]')
    .leftJoinRelated('[branches as WT.worktimes(filterBranchTimes),rates]')

    .select(raw('CASE WHEN  ?? is not null THEN "true" ELSE "false" END AS IsOpen',"WT:worktimes.id"))



    .groupBy('RestauranthId')
    .modifiers({
      filterCuisines: query => query.select('cuisines.id').select({name}).as('name')
      ,
      filterBranchTimes: query => query.where({'day_en': dayOfWeekAsInteger()[day]})
        .andWhere('open_time','<',time)
        .andWhere('close_time','>',time)
        .andWhere('isActive','=',1)
      ,
      filterTimes: query => query
        .andWhere('start_date','<',date)
        .andWhere('end_date','>',date)
        .andWhere({'publish':1})

      ,
    })

  return lastoffers
}

async function getMostOrderedBranch(name:string,description:string,google_id:string,limit:number){
  const currentday = new Date();
  const date = new Date();
  let day = date.getDay();
  let time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();

  currentday.setDate(currentday.getDate() + 1);

  var y = date.getFullYear(), m = date.getMonth();
  var firstDay = new Date(y, m, 1);
  const t = new Date().getDate() + (6 - new Date().getDay() - 1) - 7;
  const lastFriday = new Date();
  lastFriday.setDate(t);
  const getMostOrderedBranchs = await OrdersModel.query().innerJoinRelated('branches.[areas,restaurant]')
    .select([
      'branches:restaurant.'+name+' as name',
      'branches:restaurant.id as RestauranthId','branches:restaurant.cover',"branches:areas_join.delivery_time","branches:areas_join.delivery_cost"])
    .whereBetween('orders.created', [firstDay, currentday])
    .sum('orders.total as total')
    .count('orders.id as ordersnumber')
    .withGraphFetched('[branches(filterBranch).restaurant(selectRestuarant).cuisines(filterCuisines)]')
    .groupByRaw("orders.branch_id")
    .orderBy('total ', 'desc')
    .where({'branches:areas.google_id':google_id})
    .limit(limit)
    .modifiers({
      selectRestuarant: query => query.select(['restaurants.'+name+' as name','restaurants.logo','restaurants.cover',
        'restaurants.id as RestauranthId',
      ])

      ,
      filterTimes: query => query.where({'day_en': dayOfWeekAsInteger()[day]})
        .andWhere('open_time','<',time)
        .andWhere('close_time','>',time)
        .andWhere('isActive','=',1)
      ,
      filterCuisines: query => query.select([''+name+' as name','cuisines.id']),
      filterBranch: query => query.select([''+name+' as name','id'])

    });
  return getMostOrderedBranchs

}
async function MostSellItem(google_id:string,limit:number){
  const currentday = new Date();
  currentday.setDate(currentday.getDate() + 1);

  var date = new Date(), y = date.getFullYear(), m = date.getMonth();
  var firstDay = new Date(y, m, 1);
  const t = new Date().getDate() + (6 - new Date().getDay() - 1) - 7;
  const lastFriday = new Date();
  lastFriday.setDate(t);
  const BestSeller = await OrderDetailsModel.query()
    .innerJoinRelated('[orders.branches.areas,menu_categories_items]')
    .whereBetween('orders.created', [firstDay, currentday])
    .sum('order_details.amount as itemamount')
    .sum('order_details.total as itemtotal')
    .where({'orders:branches:areas.google_id':google_id})

    .limit(limit)
    .withGraphFetched('[menu_categories_items]')
    .groupByRaw("order_details.menu_categories_itemId")
  return BestSeller

}

async function GetFreeDliveryBranches(name:string,description:string,google_id:string,limit:number) {
  const currentday = new Date();
  const date = new Date();
  let day = date.getDay();
  let time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();

  currentday.setDate(currentday.getDate() + 1);

  const numDeleted = await RestaurantModel.query()

    .select([
      'restaurants.'+name+' as name',
      'restaurants.id as RestauranthId','offers.'+description+' as description','restaurants.logo','restaurants.cover as cover',"branches:areas_join.delivery_time","branches:areas_join.delivery_cost"])
    .withGraphFetched('[cuisines(filterCuisines)]')
    .avg('rates.rate as rate')
    .where({'branches:areas.google_id':google_id,})
    .limit(limit)
    .groupBy('restaurants.id')

    .joinRelated('[branches.areas]')
    .leftJoinRelated('[branches as WT.worktimes(filterBranchTimes),offers(filterTimes),rates]')
    .orderBy("branches:areas_join.delivery_time")

    .select(raw('CASE WHEN  ?? is not null THEN "true" ELSE "false" END AS IsOpen',"WT:worktimes.id"))

    .andWhere({"branches:areas_join.delivery_cost":0})
    .modifiers({
      filterCuisines: query => query.select('cuisines.id').select({name}).as('name')
      ,
      filterBranchTimes: query => query.where({'day_en': dayOfWeekAsInteger()[day]})
        .andWhere('open_time','<',time)
        .andWhere('close_time','>',time)
        .andWhere('isActive','=',1)

      ,
      filterTimes: query => query
        .andWhere('start_date','<',date)
        .andWhere('end_date','>',date)
      ,
    })


  return numDeleted

}

async function GetNearestBranches(name:string,description:string,google_id:string,limit:number) {
  const currentday = new Date();
  const date = new Date();
  let day = date.getDay();
  let time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();

  currentday.setDate(currentday.getDate() + 1);

  const numDeleted = await RestaurantModel.query()


    .select([
      'restaurants.'+name+' as name',
      'restaurants.id as RestauranthId','offers.'+description+' as description','restaurants.logo','restaurants.cover as cover',"branches:areas_join.delivery_time","branches:areas_join.delivery_cost"])
    .withGraphFetched('[cuisines(filterCuisines)]')
    .joinRelated('[branches.areas]')
    .avg('rates.rate as rate')
    .where({'branches:areas.google_id':google_id,})
    .limit(limit)
    .groupBy('restaurants.id')
    .leftJoinRelated('[branches as WT.worktimes(filterBranchTimes),rates,offers(filterTimes)]')
    .orderBy("branches:areas_join.delivery_time")
    .select(raw('CASE WHEN  ?? is not null THEN "true" ELSE "false" END AS IsOpen',"WT:worktimes.id"))

    .modifiers({
      filterCuisines: query => query.select('cuisines.id').select({name}).as('name')
      ,
      filterBranchTimes: query => query.where({'day_en': dayOfWeekAsInteger()[day]})
        .andWhere('open_time','<',time)
        .andWhere('close_time','>',time)
        .andWhere('isActive','=',1)


      ,
      filterTimes: query => query
        .andWhere('start_date','<',date)
        .andWhere('end_date','>',date)
      ,
    })



  return numDeleted

}
// end home page links


cities and towns links
router
  .get('/getCitiyTowns/:CityId',(req, respo)=> {
    async function main() {
      var name = req.headers["lang"];
      if (name == "ar"){
        name = "name";
      }
      else {
        name = "name_en";

      }
      const allUsers = await TownsModel.query().where('city_id',parseInt(req.params.CityId)).select('id','city_id',''+name+' as name')

      respo.json(allUsers)


    }
    main().catch((e) => {
      respo.json(e.message)

      throw e
    })
      .finally(async () => {
      })
  })


router
  .get('/getCitiesForApp',(req, respo)=> {
    async function main() {
      var name = req.headers["lang"];
      if (name == "ar"){
        name = "name";
      }
      else {
        name = "name_en";

      }
      const allUsers = await CitiesModel.query().select('id',''+name+' as name').withGraphFetched('towns.[areas]')

      respo.json(allUsers)


    }
    main().catch((e) => {
      respo.json(e.message)

      throw e
    })

  })



router
  .get('/resturantDetails/:id/:AreaId',  (request: Request, response: Response, next: NextFunction) => {
    async function main() {
      const d = new Date();
      let day = d.getDay();
      console.log(dayOfWeekAsInteger()[day])
      let time = d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
      console.log(time)

      var name = request.headers["lang"];
      var description = "description";
      var Itemdescription = "descriptions";

      if (name == "ar"){
        name = "name";
        description = "description";
        Itemdescription = "descriptions";

      }
      else {
        name = "name_en";
        description = "description_en";
        Itemdescription = "descriptions_en";

      }
      const numDeleted = await RestaurantModel.query()
        .select(['restaurants.'+name+' as name','restaurants.logo','restaurants.cover',
          'restaurants.id as RestauranthId',
          'menu_categories.id as MenuCategoriesId',"branches.user_id",'restaurants.has_takeway','restaurants.minimum','offers.*','restaurants.taxes','branches:areas_join.*'
        ])
        .select(raw('CASE WHEN  ?? is not null THEN "true" ELSE "false" END AS IsOpen',"WT:worktimes.id"))
        .select(raw('CASE WHEN  ?? is not null THEN ?? ELSE "false" END AS offerDescription'
          ,'offers.'+description,
          'offers.'+description))
        .select(raw('CASE WHEN  ?? is not null THEN "true" ELSE "false" END AS IsFavorite',"favourites.id"))

        .withGraphFetched('[cuisines(filterCuisines),menu_categories(filtercategories).menu_categories_items(filterItems).[menu_options_topics(filtercategories).menu_options(filtercategories)],offers(filterOffer)]')
        .leftJoinRelated('[branches.areas(filterAreas),menu_categories.menu_categories_items,offers(filterOffer),rates,branches as WT.worktimes(filterTimes),favourites]')
        .modifiers({
          filterTimes: query => query.where({'day_en': dayOfWeekAsInteger()[day]})
            .andWhere('open_time','<',time)
            .andWhere('close_time','>',time)
            .andWhere('isActive','=',1)

          ,
          filterCuisines: query => query.select({name}).as('name')
          ,
          filtercategories: query => query.select('*',''+name+' as name')
          ,
          filterItems:query => query.select('*',''+name+' as name',''+Itemdescription+' as descriptions'),

          filterAreas: query => query.where({'id':request.params.AreaId}),
          filterFavorties: query => query.where({'user_id':request.params.AreaId})

          ,
          filterOffer: query => query
            .andWhere('start_date','<',d)
            .andWhere('end_date','>',d)
        })
        .where({'restaurants.id':request.params.id})
        .avg('rates.rate as rate')
        .groupBy('restaurants.id');

      response.status(200).json({"restaurantDetails":numDeleted})


    }
    main().catch((e) => {
      response.json(e.message)

      throw e
    })

  })


//add order


router
  .post('/add', (req: any, respo: any) => {

    async function main() {
      req.body.created = new Date()



      req.body.commission = await GetCommissionForSata(req)

      const myorderss = await OrdersModel.query().insertGraph(req.body)
      const copouns =  await CreateCopounsForUser(req.body.user_id,req.body.total,myorderss.id)

      const myorders = await OrdersModel.query().first()
        .andWhere("orders.id", myorderss.id)
        .withGraphFetched('[order_details.[menu_categories_items,order_details_options.menu_options],branches,users,billing_address,order_status,paymenttype]')
      //   io.emit("makeNewOrderToBranch",myorders)

      respo.json(myorders)
    }

    main().catch((e) => {
      respo.json(e.message)

      throw e
    })
  })


router
  .get('/GetUserOrders',auth, (req: any, respo: any) => {
    async function main() {
      console.log(req.user.user)
      const myorders = await OrdersModel.query().select(['branches:restaurant.name', 'orders.*','branches.user_id as BranchUserId']).joinRelated('[branches.restaurant]')
        .withGraphFetched('[order_details.[menu_categories_items,order_details_options.menu_options],paymenttype,users]').where('orders.user_id',req.user.user).orderBy('orders.created ', 'desc')
        .modifiers({
          filterUser: query => query.select('username')
        });
      respo.json(myorders)
    }
    main()
  })

router
  .get('/PaymentTypes',auth,(req: any, respo: any)=>{
    async function main() {
      var name = req.headers["lang"];
      if (name == "ar"){
        name = "name";
      }
      else {
        name = "name_en";

      }
      const address = await PaymentTypesModel.query().select('id',''+name+' as name')
      respo.json(address)

    }
    main()
  })


router
  .post('/rate', (req: any, respo: any) => {
    async function main() {
      const myorders = await RatesModel.query().insert(req.body)
      respo.json(myorders)
    }

    main()
  })


router
  .get('/GetItemById/:id',(req: any, respo: any)=>{
    async function main() {
      const address = await MenuCategoriesItemsModel.query().joinRelated('[menu_categories]')

        .withGraphFetched('[menu_options_topics.menu_options,menu_categories]')
        .where({"menu_categories_items.id":req.params.id})


      respo.json(address)


    }
    main().catch((e) => {
      respo.json(e.message)

      throw e
    })
  })


// Favorites/get
router
  .get('/get', auth, (req:any, respo:any)=> {
    async function main() {

      console.log(req.user.user)
      const Favorties = await FavortiesModel.query().where('favourites.user_id',req.user.user).withGraphFetched('[restaurants]')
      respo.json(Favorties);
    }

    main()
  })



//staticpages/index

router
  .get('/index',(req: any, respo: any)=>{
    async function main() {

      const address = await staticPagesModel.query()
      respo.json(address)

    }
    main()
  })
