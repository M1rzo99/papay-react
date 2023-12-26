import { Box, Container, Stack } from "@mui/material";
import "../../../css/help.css";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import TabList from "@mui/lab/TabList";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
export function HelpPage() {
  /* INITIALIZATION */
  const [value, setValue] = React.useState("1");
  const faq = [
    {
      question: "To'lov qanday amalga oshirilinadi?",
      answer:
        "To'lovni Payme,Click ilovalari orqali amalga oshirishingiz mumkin.",
    },
    {
      question: "Buyurtmalar qancha vaqtda yetib keladi?",
      answer:
        "Buyutmalar harida qilingan mahsulotga qarab har xil vaqtda yetkazib berilishi mumkin. Minimum 3kunda yetib boradi",
    },
    {
      question:
        "Saytdan foydalansam ma'lumotlarim havfsizligiga kafolat bormi?",
      answer:
        "Albatda,bizning dasturchilarimiz sizning ma'lumotlaringiz havfsizligini ishonchli holda kafolatlashadi.",
    },
    {
      question: "Saytda muammo yuzaga kelsa kimga murojat qilaman?",
      answer:
        "hurmatli mijoz,iltimos adminga xat yo'llash bo'limidan foydalanishingiz mumkin.",
    },
    {
      question:
        "Men foydalanuvchi emas Biznesmen sifatida faoliyat ko'rsatmoqchiman.qaysi raqam bilan bog'lanay?",
      answer:
        "hurmatli mijoz,saytda ko'rsatilgan telefon raqamlarga mutojat qiling.",
    },
    {
      question: "Saytda muammo yuzaga kelsa kimga murojat qilaman?",
      answer:
        "hurmatli mijoz,iltimos adminga xat yo'llash bo'limidan foydalanishingiz mumkin.",
    },
    {
      question:
        "Saytdan foydalansam ma'lumotlarim havfsizligiga kafolat bormi?",
      answer:
        "Albatda,bizning dasturchilarimiz sizning ma'lumotlaringiz havfsizligini ishonchli holda kafolatlashadi.",
    },
    {
      question: "Buyurtmalar qancha vaqtda yetib keladi?",
      answer:
        "Buyutmalar harida qilingan mahsulotga qarab har xil vaqtda yetkazib berilishi mumkin. Minimum 3kunda yetib boradi",
    },
  ];
  const rules = [
    `Saytdan to'laqonli yani buyurtmala qilish,jonli muloqatlardan foydalanishingiz uchun ro'yhatdan o'tishingiz shart.`,
    `Buyurtamlaringizga to'lovni amalga oshirganingizdan so'ng bekor qilish imkoni yo'q shu sababli to'lovlarni amalga oshirishdan avval tekshirib oling.`,
    `Jonli muloqat vaqtida behayo so'zlarni ishlatish mutlaqo taqiqlanadi.`,
    `Shaxsiy reklamangizni admin ruxsatisiz yozish va tarqatish mumkin emas!`,
    `Maqolalaringiz odob doirasidan chiqib ketmasligi kerak.`,
    `Barcha xarakatlaringiz adminlarimiz nazorati ostida bo'lgani sababli iltimos talablarimizni xurmat qiling.`,
  ];
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className={"help_page"}>
      <Container maxWidth="lg" sx={{ mt: "50px", mb: "50px" }}>
        <TabContext value={value}>
          <Box className={"help_menu"}>
            <Box sx={{ borderBottom: 1, borderColor: "#fff" }}>
              <TabList
                onChange={handleChange}
                aria-label={"lab API tabs example"}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Tab label="Qoidalar" value={"1"} />
                <Tab label="FAQ" value={"2"} />
                <Tab label="Adminga xat" value={"3"} />
              </TabList>
            </Box>
          </Box>
          <Stack>
            <Stack className={"help_main_content"}>
              <TabPanel value={"1"}>
                <Stack className={"theRules_box"}>
                  <Box className={"theRulesFrame"}>
                    {rules.map((ele, number) => {
                      return <p>{ele}</p>;
                    })}
                  </Box>
                </Stack>
              </TabPanel>
              <TabPanel value={"2"}>
                <Stack className={"acccardion_menu"}>
                  {faq.map((ele, number) => {
                    return (
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panella-content"
                          id="panella-header"
                        >
                          <Typography>{ele.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>{ele.answer}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
                </Stack>
              </TabPanel>
              <TabPanel value={"3"}>
                <Stack className={"admin_letter_box"}>
                  <Stack className={"admin_letter_container"}>
                    <Box className={"admin_letter_frame"}>
                      <span>Adminga Xabar Qoldirish</span>
                      <p>
                        Assalom alaykum! Adminga xabar qoldirish uchun pastdagi
                        formalarni to'ldiring! {""}
                      </p>
                    </Box>
                    <form
                      action="#"
                      method={"POST"}
                      className={"admin_letter_frame"}
                    >
                      <div className={"admin_input_box"}>
                        <label>Ism</label>
                        <input
                          type={"text"}
                          name={"mb_nick"}
                          placeholder={"Ism"}
                        />
                      </div>
                      <div className={"admin_input_box"}>
                        <label>Elektron Manzil</label>
                        <input
                          type={"text"}
                          name={"mb_email"}
                          placeholder={"Elektron Manzil"}
                        />
                      </div>
                      <div className={"admin_input_box"}>
                        <label>Xabar</label>
                        <textarea
                          name={"mb_msg"}
                          placeholder={"Xabar"}
                        ></textarea>
                      </div>
                      <Box
                        style={{
                          justifyContent: "flex-end",
                          display: "flex",
                        }}
                        display={"flex"}
                        sx={{ mt: "30px" }}
                      >
                        <Button
                          sx={{ mb: "10px", mr: "115px" }}
                          type={"submit"}
                          variant="contained"
                        >
                          Jo'natish
                        </Button>
                      </Box>
                    </form>
                  </Stack>
                </Stack>
              </TabPanel>
            </Stack>
          </Stack>
        </TabContext>
      </Container>
    </div>
  );
}
