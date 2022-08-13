import { Injectable } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { getVendorOffersData } from "../../help/getVendorOffersData";

@Injectable()
export class VendorService {
  create(createVendorDto: CreateVendorDto) {
    return 'This action adds a new vendor';
  }

  findAll() {
    return `This action returns all vendor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vendor`;
  }

  update(id: number, updateVendorDto: UpdateVendorDto) {
    return `This action updates a #${id} vendor`;
  }

  remove(id: number) {
    return `This action removes a #${id} vendor`;
  }
  //getVendorOffersData
  async getVendorOffersData(body,req) {
    const getVendorOffers = await getVendorOffersData(req.name, 100, req.description, req.body.googleId)
    return getVendorOffers
  }
}
