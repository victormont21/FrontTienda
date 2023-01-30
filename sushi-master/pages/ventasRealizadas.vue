<template>
  <div>
    <ComponentNavAdmin />
    <br />
    <div class="text-center" v-if="mListaVentasRealizadas.length <= 0">
      <v-img class="d-block mx-auto" src="/emptycart.svg" width="500"></v-img>
      <p>ACTUALMENTE NO TIENE COMPRAS REALIZADAS.</p>
    </div>
    <v-container>
      <el-table
        v-if="mListaVentasRealizadas.length > 0"
        :data="mListaVentasRealizadas"
      >
        <el-table-column min-width="100" prop="id" label="Codigo">
        </el-table-column>
        <el-table-column min-width="200" prop="email_cliente" label="Email">
        </el-table-column>

        <el-table-column
          min-width="250"
          prop="id_paypal"
          label="CODE PAGO PAYPAL"
        >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span >{{ (scope.row.id_paypal == null || scope.row.id_paypal == "") ? "PAGO NORMAL" : scope.row.id_paypal }}</span>
          </template>
        </el-table-column>

        <el-table-column
          min-width="200"
          prop="date_compra"
          label="Fecha Compra"
        >
        </el-table-column>

        <el-table-column min-width="150" prop="total" label="Total($)">
        </el-table-column>

        <el-table-column min-width="150"
                   label="ACCIONES">
                   <template slot-scope="scope">
        <v-btn
          @click="showOpenDialog(scope.row)"
          min-height="45"
          color="primary"
          style="margin-top: 0.5rem;margin-bottom:0.5rem;"
          >VER PEDIDO</v-btn
        >


      </template>
  </el-table-column>


      </el-table>
    </v-container>
    <br /><br />
    <Footer />
    <ScrollTop />
  </div>
</template>

<script>
import NavAdmin from "../components/Desktop/NavAdmin.vue";
import { Table, TableColumn } from "element-ui";
import  pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    ComponentNavAdmin: NavAdmin,
  },
  data() {
    return {
      mListaVentasRealizadas: [],
    };
  },

  methods: {
    getFecha_format(fecha) {
      var new_fecha = new Date(fecha);

      var dia = new_fecha.getDate();

      var mes = new_fecha.getMonth();

      mes += 1;

      var min = new_fecha.getMinutes();
      var hour = new_fecha.getHours();
      var seg = new_fecha.getSeconds();

      if (dia < 10) {
        dia = "0" + dia;
      }
      if (mes < 10) {
        mes = "0" + mes;
      }

      if (hour < 10) {
        hour = "0" + hour;
      }

      if (min < 10) {
        min = "0" + min;
      }

      if (seg < 10) {
        seg = "0" + seg;
      }

      return (
        new_fecha.getFullYear() +
        "-" +
        mes +
        "-" +
        dia +
        " " +
        hour +
        ":" +
        min +
        ":" +
        seg
      );
    },

    showOpenDialog(item)
    {
      console.log(item)
      var sumFalt  = 0

      var empresa = [
        {
          text: 'CEBOLLITAS STORE',
          fontSize: 14,
          bold: true,
          alignment: "center",
        },
      ];

      var resultadoString = [
        [
          { text: "CANT", fontSize: 8.5, bold: true, alignment: "center" },
          { text: "DETALLE", fontSize: 8.5, bold: true, alignment: "center" },
          { text: "TOTAL", fontSize: 8.5, bold: true, alignment: "center" },
        ]
      ]

      var datos = JSON.parse(item.detalle_compra)

      for(var i = 0;i<datos.length;i++)
      {
        var arrys = [
          {
            text: datos[i].quantity,
            fontSize: 8.5,
          },
          {
            text: datos[i].product.nombre,
            fontSize: 8.5,
            alignment: "center",
          },
          {
            text: Number(datos[i].quantity * parseFloat(datos[i].product.precio)).toFixed(2),
            fontSize: 8.5,
            alignment: "center",
          }
        ];
        resultadoString.push(arrys);
        sumFalt = sumFalt + (datos[i].quantity * parseFloat(datos[i].product.precio))
      }


      var docDefinition = {
        // a string or { width: 190, height: number }
        pageSize: { width: 220, height: "auto" },
        pageMargins: [15, 15, 15, 15],
        compress: true,
        // header: [empresa],

        content: [
          {
            headerRows: 0,
            fontSize: 12,
            bold: true,
            layout: "noBorders", // optional
            table: {
              widths: ["*"],
              body: [empresa],
            },
          },
          {
            fontSize: 8.5,
            layout: "noBorders",
            // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 0,
              widths: [26, 90, 45],

              body: resultadoString,
            },
          },

          {
            fontSize: 10,
            bold: true,
            layout: "noBorders", // optional
            table: {
              body: [
                ["TOTAL DINERO : " + Number(sumFalt).toFixed(2)],
              ],
            },
          },

          {
            fontSize: 6,
            layout: "noBorders", // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers

              body: [
                ["."]
              ],
            },
          },
        ],
      };

      //var pdfDocGenerator = pdfMake.createPdf(docDefinition);
      var win = window.open('', '_blank');
      pdfMake.createPdf(docDefinition).open({}, win);

    },

    async readVentasRealizadas() {
      try {
        var email = this.$cookies.get("email")
        console.log("EMAIL : "+email)
        var datos = await this.$axios.get(
          process.env.baseUrl + "/compra?email="+email+"&fk_rol=1"
        )

        console.log(datos.data)

        var lista =  datos.data.length > 0 ?  datos.data.reverse() : []
        this.mListaVentasRealizadas.push(...lista);

      } catch (error) {
        console.log(error.toString())
        this.mListaVentasRealizadas = [];
      }

      console.log(this.mListaVentasRealizadas)
    },
  },
  mounted() {
    this.readVentasRealizadas();
  },
};
</script>

<style></style>
