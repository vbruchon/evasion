// import { prisma } from "@/lib/prisma";

// async function main() {
//   const test = await prisma.test.create({
//     data: {
//       title: "test",
//     },
//   });
//   console.log("Created test:", test);
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

//   const statuses = ["PUBLISHED", "DRAFT", "ARCHIVED"] as const;

//   const daysAgo = [0, 1, 3, 5, 8, 12, 20, 35, 60, 120];

//   const displayedAccommodations =
//     process.env.NODE_ENV === "development"
//       ? Array.from({ length: 5 }, (_, groupIndex) =>
//           accommodations.map((accommodation, accommodationIndex) => {
//             const index =
//               groupIndex * accommodations.length + accommodationIndex;

//             const galleryImages = accommodation.images.filter(
//               (image) => !image.isCover,
//             );

//             const testCoverImage =
//               groupIndex === 0
//                 ? undefined
//                 : galleryImages.length > 0
//                   ? galleryImages[(groupIndex - 1) % galleryImages.length]
//                   : accommodation.images[0];

//             const images =
//               groupIndex === 0
//                 ? accommodation.images
//                 : accommodation.images.map((image) => ({
//                     ...image,
//                     isCover: image.id === testCoverImage?.id,
//                   }));

//             return {
//               ...accommodation,
//               id: `${accommodation.id}-${index}`,
//               name:
//                 groupIndex === 0
//                   ? accommodation.name
//                   : `${accommodation.name} ${groupIndex + 1}`,
//               slug: `${accommodation.slug}-${index}`,
//               status: statuses[index % statuses.length],
//               position: index + 1,
//               updatedAt: new Date(
//                 Date.now() -
//                   daysAgo[index % daysAgo.length] * 24 * 60 * 60 * 1000,
//               ),
//               images,
//             };
//           }),
//         ).flat()
//       : accommodations;
