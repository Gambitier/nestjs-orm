1. @ApiProperty({ enum: TestEnum })

   `TestEnum` should be imported as absolute import, if you import from `index.ts` (i.e. from barrel exports), it will not be visible on swagger UI for `schema` section.
