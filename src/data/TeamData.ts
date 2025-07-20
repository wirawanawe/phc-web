import member1 from "@/assets/img/team/member1.png";
import member2 from "@/assets/img/team/member2.png";
import member3 from "@/assets/img/team/member3.png";
import member4 from "@/assets/img/team/member4.png";

type partner_data_type = {
  id: number;
  img: any;
  name: string;
};

const partner_data: partner_data_type[] = [
  {
    id: 1,
    img: member1,
    name: "Kementerian Kesehatan RI",
  },
  {
    id: 2,
    img: member2,
    name: "PT PLN (Persero)",
  },
  {
    id: 3,
    img: member3,
    name: "Kopkar Karya Lisna Satu",
  },
  {
    id: 4,
    img: member4,
    name: "Klinik Graha Listi Bekasi",
  },
];

export default partner_data;
