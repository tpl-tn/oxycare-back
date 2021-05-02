import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Oxygene } from './oxygen.entity';
import { OxygeneService } from './oxygene.service';

@ApiTags('oxygene')
@ApiBearerAuth()
@Controller('oxygene')
export class OxygeneController {

    constructor(
        private readonly oxygeneService: OxygeneService
        ){}
    @Get('')
    findAllOxygene(@Res() res): Promise<Oxygene[]>  {
        return this.oxygeneService.findAllOxygene()
          .then(data =>
            
           {
            return res.status(HttpStatus.OK).json(data); 
           } )
           .catch(erreur => {
            return res
              .status(HttpStatus.BAD_REQUEST)
              .json({ message: 'BAD_REQUEST' });
          });
      }
      @UseGuards(AuthGuard())
      @Post('add')
      addOxygene(@Req() req: any,@Res() res, @Body() body: Oxygene): Promise<any>  {
        const idU = req.user.id;
        
          body.user=idU
          return this.oxygeneService.saveOrUpdateOxygene(body)
            .then(data =>
              
             {
              return res.status(HttpStatus.OK).json(data); 
             } )
             .catch(erreur => {
              return res
                .status(HttpStatus.BAD_REQUEST)
                .json({ message: 'BAD_REQUEST' });
            });
        }
        @Delete()
      deleteOygene(@Res() res): Promise<Oxygene>  {
          return this.oxygeneService.findAllOxygene()
            .then(data =>
              
             {
              return res.status(HttpStatus.OK).json(data); 
             } )
             .catch(erreur => {
              return res
                .status(HttpStatus.BAD_REQUEST)
                .json({ message: 'BAD_REQUEST' });
            });
        }

        @Put()
        editOygene(@Res() res): Promise<any>  {
            return this.oxygeneService.findAllOxygene()
              .then(data =>
                
               {
                return res.status(HttpStatus.OK).json(data); 
               } )
               .catch(erreur => {
                return res
                  .status(HttpStatus.BAD_REQUEST)
                  .json({ message: 'BAD_REQUEST' });
              });
          }
  

}
