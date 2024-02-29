const BASE_URL_UA = 'https://date.nager.at/api/v3/PublicHolidays/2024/UA';
const BASE_URL_US = 'https://date.nager.at/api/v3/PublicHolidays/2024/US';
const BASE_URL_DE = 'https://date.nager.at/api/v3/PublicHolidays/2024/DE';
const BASE_URL_FR = 'https://date.nager.at/api/v3/PublicHolidays/2024/FR';

export const getHolidaysForUpcomingWeek = async () => {
  try {
    const responses = await Promise.all([
      fetch(BASE_URL_UA),
      fetch(BASE_URL_US),
      fetch(BASE_URL_DE),
      fetch(BASE_URL_FR),
    ]);

    const holidayData = await Promise.all(
      responses.map(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        return data;
      })
    );

    return holidayData;
  } catch (error) {
    throw new Error(`Fetch error!`);
  }
};
