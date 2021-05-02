import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
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
      @ApiBody({
        type: Oxygene,
        required: true,
      })
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
        @Delete(':id')
        @ApiParam({ name: 'id', type: 'number', required: true })
        @UseGuards(AuthGuard())
      deleteOygene(@Res() res,@Param('id') id): Promise<Oxygene>  {
          return this.oxygeneService.delete(id)
            .then(data =>
              
             {
              res.status(HttpStatus.OK).json({ data }) 
             } )
             .catch(erreur => {
              return  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: `Une erreur c'est produit lors de supression de matière.\nErreur: ${erreur}`,
              })
            });
        }

        @Put(':id')
        @ApiParam({ name: 'id', type: 'number', required: true })
        @ApiBody({
          type: Oxygene,
          required: true,
        })
        @UseGuards(AuthGuard())
        editOygene(@Res() res, @Param('id') id: any,
        @Body() oxygene: Oxygene): Promise<any>  {
          return this.oxygeneService
          .findOneOxygene(id)
          .then(response => {
            if (response) {
              return this.oxygeneService.
                saveOrUpdateOxygene(response)
                .then(result =>
                  res
                    .status(HttpStatus.OK)
                    .json({ message: 'Oxygene modifié avec succès', result }),
                )
                .catch(error =>
                  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: `Une erreur c'est produit lors de modification de oxygene.\nErreur: ${error}`,
                  }),
                );
            } else {
              return res
                .status(HttpStatus.NOT_FOUND)
                .json({ error: `Oxygene inexistante` });
            }
          })
          .catch(error =>
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
              error: `Une erreur c'est produit lors de récupération de Oxygene.\nErreur: ${error}`,
            }),
          );

          }
          
  

}
