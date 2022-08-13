import { Injectable } from '@nestjs/common';
import { CreateHomePageDto } from './dto/create-home-page.dto';
import { UpdateHomePageDto } from './dto/update-home-page.dto';
import HomeMobileTitlesModel from './entities/HomeMobileTitles';
import AdsSpacesNameModel from './entities/AdsSpacesName';
import { getVendorOffersData } from "../../help/getVendorOffersData";
import { getMostOrderedBranch } from "../../help/getMostOrderedBranch";
import { GetNewOffer } from "../../help/GetNewOffer";
import { MostSellItem } from "../../help/MostSellItem";
import { GetNearestBranches } from "../../help/GetNearestBranches";
import { GetFreeDliveryBranches } from "../../help/GetFreeDliveryBranches";

@Injectable()
export class HomePageService {

  create(createHomePageDto: CreateHomePageDto) {
    return 'This action adds a new homePage';
  }

  findAll() {
    return `This action returns all homePage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} homePage`;
  }

  update(id: number, updateHomePageDto: UpdateHomePageDto) {
    return `This action updates a #${id} homePage`;
  }

  remove(id: number) {
    return `This action removes a #${id} homePage`;
  }
  async GetHomePage(body, req) {
    const GetHomePageTitles = await HomeMobileTitlesModel.query().select(
      'home_mobile_titles.' + req.title + ' as title',
    );

    const GetPercentageForVendors = {
      title: GetHomePageTitles[0].title,
      data: await getVendorOffersData(
        req.name,
        6,
        req.description,
        req.body.googleId,
      ),
    };
    const GetNewOffers = {
      title: GetHomePageTitles[1].title,
      data: await GetNewOffer(req.name, req.description, req.body.googleId, 6),
    };
    const getMostOrderedBranchs = {
      title: GetHomePageTitles[2].title,
      data: await getMostOrderedBranch(
        req.name,
        req.description,
        req.body.googleId,
        6,
      ),
    };
    const MostSellItems = {
      title: GetHomePageTitles[3].title,
      data: await MostSellItem(req.body.googleId, 6),
    };
    const GetNearestBranche = {
      title: GetHomePageTitles[4].title,
      data: await GetNearestBranches(
        req.name,
        req.description,
        req.body.googleId,
        6,
      ),
    };
    const GetFreeDliveryBranche = {
      title: GetHomePageTitles[5].title,
      data: await GetFreeDliveryBranches(
        req.name,
        req.description,
        req.body.googleId,
        6,
      ),
    };
    return {
      GetPercentageForVendors: GetPercentageForVendors,
      lastoffers: GetNewOffers,
      getMostOrderedBranch: getMostOrderedBranchs,
      MostSellItems: MostSellItems,
      GetNearestBranche: GetNearestBranche,
      GetFreeDliveryBranches: GetFreeDliveryBranche,
    };
  }

  //GetMainSliders
  async GetMainSliders(req, body) {
    console.log(req.body.googleId)
    const address = await AdsSpacesNameModel.query()
      .withGraphFetched('[AdsSpacesprice(selectPriceFields)]')
      .modifiers({
        selectPriceFields: (query) =>
          query
            .select(['ads_space_prices.id', 'ads_space_prices.positions'])

            .andWhere('sliders.approval', 1)
            .andWhere('sliders.publish', 1)

            // .andWhere('sliders.start_date','<',d)
            // .andWhere('sliders.end_date','>',d)
            .where({
              'sliders:restaurants:branches:areas.google_id': req.body.googleId,
            })
            .withGraphFetched('sliders')
            .innerJoinRelated('sliders.restaurants.branches.areas')
            .orderBy('ads_space_prices.positions')
            .groupBy('ads_space_prices.id'),
      });

    return address;
  }


  //categoriesIndex
  categoriesIndex(){

  }
}
